/* eslint-disable no-unused-vars */
exports.Trackers = class Trackers {
  constructor(options) {
    this.options = options || {};
  }

  setup(app) {
    this.app = app;
  }

  async get(id, params) {
    const analyticsConfig = this.app.get('analytics');
    const appId = `${analyticsConfig.snowplow.appIdPrefix}${params.user.organizations.uuid}`;
    const trackerName = analyticsConfig.snowplow.webTrackerName;
    const trackerUrl = analyticsConfig.snowplow.trackerUrl;
    const trackerObjectName = analyticsConfig.snowplow.trackerObjectName;
    const collectorUri = analyticsConfig.snowplow.collectorUri;
    const cookieDomain = analyticsConfig.snowplow.cookieDomain;
    const tracker = `;(function (s, i, g, n, a, l, s_
        ) {
            if (!p[i]) {
                s.GlobalAnalyticsNamespace = p.GlobalAnalyticsNamespace || [];
                s.GlobalAnalyticsNamespace.push(a);
                s[a] = function () {
                    (s[a].q = s[i].q || []).push(arguments);
                };
                s[a].q = s[a].q || [];
                l = i.createElement(g);
                s_ = i.getElementsByTagName(g)[0];
                l.async = 1;
                l.src = n;
                s_.parentNode.insertBefore(l, s_);
            }
        }(window, document, 'script', '${trackerUrl}', '${trackerObjectName}'));
        window.${trackerObjectName}('newTracker', '${trackerName}', '${collectorUri}',
            {
                appId: '${appId}',
                cookieDomain: '.${cookieDomain}',
                forceSecureTracker: true,
            });`;

    return {
      tracker: `${tracker}`
    };
  }
};
