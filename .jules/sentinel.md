## 2024-05-27 - Enable nuxt-security CSP
**Vulnerability:** nuxt-security is installed and its `contentSecurityPolicy` is set to false in `nuxt.config.ts` by default.
**Learning:** This removes CSP header entirely instead of making it strictly secure.
**Prevention:** We should remove the `contentSecurityPolicy: false` line from `nuxt.config.ts` so that `nuxt-security` applies its default secure CSP headers.
