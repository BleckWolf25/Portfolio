# Security Policy

Thank you for helping keep this project secure. As an open-source portfolio project, maintaining a safe environment for users is important, but resources are limited. 
Please review the policy below regarding supported versions and reporting vulnerabilities.

## Supported Versions

Security updates and vulnerability patches are exclusively provided for the latest Long-Term Support (LTS) release. 

| Version                  | Supported | Notes                                                 |
| ------------------------ | --------- | ----------------------------------------------------- |
| **3.0.0** (LTS / Latest) |  Yes      | Active support for security vulnerabilities.          |
| < 3.0.0                  | ❌ No    | Please upgrade to the latest LTS version immediately.  |

> ⚠️ **Important:** To report a valid security issue, your environment **must** be actively running on the latest **3.0.0** release. Bugs or vulnerabilities found on older, modified, or deprecated branches will not be triaged.

---

## Scope of Support & Limitations

This application is built entirely as a **client-side architecture**. 

While the codebase allows for server-side extensions or self-hosted backend integrations, please note:
* **No Server-Side Maintenance:** Any server-side implementations, hosting environments, or external API bridges are strictly the responsibility of the end-user.
* **Out of Scope:** Security vulnerabilities originating from, related to, or caused by custom server-side setups, database layers, or backend environments **will not be investigated or fixed**. 

We only patch vulnerabilities that exist within the native client-side codebase.

---

## Reporting a Vulnerability

If you discover a security vulnerability, please do not disclose it publicly via public GitHub Issues or Pull Requests. 

Please follow this process instead:

1. **Verify:** Ensure the vulnerability is reproducible on a clean install of version **3.0.0** and is strictly restricted to client-side logic.
2. **Report:** Send a detailed report via email to **joao.coutinho08@icloud.com**.
3. **Include Details:** * A clear description of the vulnerability.
   * Steps to reproduce (or a Proof of Concept script/payload).
   * The potential impact of the exploit.

### Response Timeline

You will receive an acknowledgment of your report within **[48-72 hours]**. 
If the vulnerability is verified as valid and within the scope of this project, a patch will be prepared and pushed to the main branch as a high priority.
