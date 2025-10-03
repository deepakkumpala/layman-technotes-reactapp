### Single Sign-On

Imagine you log in to your Google account. Once authenticated, you can seamlessly access Gmail, Google Drive, YouTube, and other Google services without needing to re-enter your credentials for each service. This is an example of SSO in action.

Single Sign-On (SSO) and Multi-Factor Authentication (MFA) are two important security features that are often used together but serve different purposes. 

SSO, provided by Azure AD Connect, allows users to authenticate once on their company device using Active Directory (AD) credentials. Once logged in, the user doesn't need to authenticate again when accessing other services tied to Azure AD. This simplifies the login process and improves the user experience. However, a modern browser and company device are required for this to work. It's important to note that SSO is different from MFA, as SSO is about logging in once to access all services, whereas MFA is focused on verifying the user's identity through multiple verification methods.

MFA enhances security by requiring two or more forms of identification: something the user knows (like a password), something the user has (like a phone), or something the user is (like biometrics). Common MFA methods include phone calls, text messages, mobile app notifications, mobile app verification codes, and third-party solutions. Using these methods together ensures a higher level of security than a single password alone.

In summary, SSO simplifies access by allowing one login for multiple services, while MFA provides additional security by verifying the user through multiple methods. Both can be used together to improve both user experience and security.


Key Terminologies

- Identity Provider (IdP): 
    The central system that authenticates the user and provides identity information to other applications.
    Example:   `Google, Microsoft Azure AD, Okta`
    
- Service Provider (SP):

    The applications or systems that rely on the IdP for authentication.
    Example:    Gmail, Google Drive, YouTube    .

- Authentication Protocols:

    SSO uses standard protocols to securely exchange authentication data between the IdP and SPs.

    Common protocols include:

        - SAML (Security Assertion Markup Language): XML-based protocol often used in enterprise environments.
        - OAuth 2.0: Token-based protocol for authorization, commonly used in web and mobile apps.
        - OpenID Connect (OIDC): Built on top of OAuth 2.0, it adds authentication capabilities.
- Tokens:  After successful authentication, the IdP issues a token (e.g., SAML assertion, JWT) that contains user identity and access information. This token is passed to the SPs to grant access.