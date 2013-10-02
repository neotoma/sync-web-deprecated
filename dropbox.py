"""Dropbox OAuth flow.

https://www.dropbox.com/developers/core/start/python
https://www.dropbox.com/static/developers/dropbox-python-sdk-1.6-docs/
https://www.dropbox.com/developers/core/docs
"""

import json
import logging
import os
import string
import StringIO
import urllib

import appengine_config
from python_dropbox.client import DropboxOAuth2Flow, DropboxClient
from webob import exc

from google.appengine.api import urlfetch
from google.appengine.ext import db
from google.appengine.ext.webapp import template
import webapp2


TITLE_MAX_LEN = 40
REAL_DOMAIN = 'www.asheville.io'
APPSPOT_DOMAIN = 'asheville-io.appspot.com'
DROPBOX_APP_KEY = appengine_config.read('dropbox_app_key')
DROPBOX_APP_SECRET = appengine_config.read('dropbox_app_secret')
OAUTH_CALLBACK = '%s://%s/dropbox/oauth_callback' % (appengine_config.SCHEME,
                                                     appengine_config.HOST)
CSRF_PARAM = 'dropbox-auth-csrf-token'


class DropboxCsrf(db.Model):
  """Stores a CSRF token for the Dropbox OAuth2 flow."""
  token = db.StringProperty(required=False)


class Dropbox(db.Model):
  """A Dropbox account. The key name is the user id."""

  # OAuth2 access token for this account
  # https://www.dropbox.com/developers/core/start/python#authenticating
  oauth_token = db.StringProperty(required=True)

  def hostname(self):
    return self.key().name()

  def display_name(self):
    return self.hostname()

  @classmethod
  def new(cls, user_id, **kwargs):
    """Creates and saves a Dropbox entity based on query parameters.

    Args:
      user_id: string
      kwargs: passed through to the Dropbox() constructor

    Returns: Dropbox
    """
    return Dropbox.get_or_insert(user_id, **kwargs)


class AddDropbox(webapp2.RequestHandler):
  def post(self):
    csrf = DropboxCsrf()
    csrf.save()
    csrf_holder = {}
    flow = DropboxOAuth2Flow(DROPBOX_APP_KEY, DROPBOX_APP_SECRET,
                             OAUTH_CALLBACK, csrf_holder, CSRF_PARAM)

    auth_url = flow.start(url_state=str(csrf.key().id()))

    csrf.token = csrf_holder[CSRF_PARAM]
    csrf.save()
    logging.info('Stored DropboxCsrf id %d, redirecting to Dropbox: %s',
      csrf.key().id(), auth_url)
    self.redirect(auth_url)


class OAuthCallback(webapp2.RequestHandler):
  """OAuth callback. Fetches the user's blogs and re-renders the front page."""

  def get(self):
    # Redirect from https://asheville-io.appspot.com/ to http://asheville.io/
    # for now, since App Engine charges $40/mo for SSL on custom domains:
    # https://developers.google.com/appengine/docs/billing#Billable_Resource_Unit_Costs
    # if self.request.host == APPSPOT_DOMAIN:
    #   self.redirect('http://%s%s' % (REAL_DOMAIN, self.request.path_qs))
    #   return

    # lookup the CSRF token
    csrf_id = self.request.get('state').split('|')[1]
    csrf = DropboxCsrf.get_by_id(int(csrf_id))
    if not csrf:
      raise exc.HTTPBadRequest('No CSRF token for id %s', csrf_id)

    # extract the OAuth access token
    csrf_holder = {CSRF_PARAM: csrf.token}
    flow = DropboxOAuth2Flow(DROPBOX_APP_KEY, DROPBOX_APP_SECRET,
                             OAUTH_CALLBACK, csrf_holder, CSRF_PARAM)
    try:
      access_token, user_id, _ = flow.finish(self.request.params)
    except DropboxOAuth2Flow.NotApprovedException:
      self.response.headers['Content-Type'] = 'text/plain'
      self.response.out.write('User declined.')
      return
    except (DropboxOAuth2Flow.BadStateException,
            DropboxOAuth2Flow.BadRequestException):
      logging.exception('')
      raise exc.HTTPBadRequest()
    except (DropboxOAuth2Flow.CsrfException,
            DropboxOAuth2Flow.ProviderException):
      logging.exception('')
      raise exc.HTTPForbidden()

    logging.info('Storing new Dropbox account: %s', user_id)
    dropbox = Dropbox.new(user_id, oauth_token=access_token)
    self.redirect('/sources.html')


class DeleteDropbox(webapp2.RequestHandler):
  def post(self):
    site = Dropbox.get(self.request.params['id'])
    msg = 'Deleted %s: %s' % (site.type_display_name(), site.display_name())
    site.delete()
    self.redirect('/?msg=' + msg)


application = webapp2.WSGIApplication([
    ('/dropbox/dest/add', AddDropbox),
    ('/dropbox/oauth_callback', OAuthCallback),
    ('/dropbox/dest/delete', DeleteDropbox),
    ], debug=appengine_config.DEBUG)
