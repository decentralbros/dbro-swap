/* eslint-disable react/no-unescaped-entities */
import { Flex, Text } from '@pancakeswap/uikit'
import { styled } from 'styled-components'

export const Container = styled(Flex)`
  display: grid;
  max-width: 650px;
  margin: 50px auto;
  padding: 0px 16px;

  h1 {
    font-size: 2.25rem;
    font-weight: bold;
  }

  h3 {
    margin: 1em 0px 0.5em;
    font-weight: bold;
  }

  p {
    opacity: 0.94;
    margin-bottom: 1em;
    line-height: 24px;
  }

  li {
    margin: 0.5em 0px 0px 1em;
    color: ${({ theme }) => theme.colors.text};
  }
`

const TermsOfService = () => {
  return (
    <Container>
      <Text as="h1">TERMS AND CONDITIONS</Text>
      <Text as="h3">Last modified: Oct 28, 2024</Text>

      <Text as="h3">1. Introduction</Text>
      <Text as="p">
        The following Standard Terms and Conditions upon which Decentral Bros, LLC (along with its affiliates and
        subsidiaries, the “Company”) offers access to their “website” (the below mentioned sites and any software
        provided by the Company for use with these sites, including (www.decentralbros.xyz, decentralbros.finance,
        www.decentralbros.social, www.decentralbros.dev, & www.decentralbros.tech). These Terms and Conditions shall
        manage your usage of the Website, as the customer, irrespective of whether or not you are an Account holder
        ("You") and the use of its services provided via the Site (the "Services"). Minors or persons below the age of
        18 years old shall not be allowed to use this Website, even if they are in accordance with all other policies
        listed herein. By using this Website, you agreed to accept all terms and conditions herein and agree to be
        legally bound by these Terms and all terms, policies, and guidelines incorporated by reference in these Terms.
        You shall not use this Website if you disagree with any of these Website Standard Terms and Conditions.
        <br />
        <br />
        If at any time, you do not wish to accept the Terms and Conditions, you may not use the Site. Any terms and
        conditions proposed by you which are in addition to or which conflict with these Terms and Conditions are
        expressly rejected by the Company and will have no force or effect.
        <br />
        <br />
        You understand and agree that the Company may discontinue or change the Site at any time, without notice. You
        also understand and agree that the Company may discontinue or restrict your use of this Site for any reason
        without notice.
      </Text>

      <Text as="h3">2. Intellectual Property Rights</Text>
      <Text as="p">
        Other than the content you own, under these Terms, the company and/or its licensors own all the intellectual
        property rights and materials contained in this Website.
        <br />
        <br />
        You are granted a limited license only for purposes of viewing the material contained on this Website
      </Text>

      <Text as="h3">3. Terms of Use</Text>
      <Text as="p">
        The Company grants you a limited, revocable, non-exclusive, non-sublicensable license to access the Site and to
        view, copy, and print the portions of the Content available to you on the Site. Except as expressly permitted
        above, any use of any portion of the Content without the prior written permission of its owner is strictly
        prohibited and will terminate the license granted in this Agreement and your account with us. You represent and
        warrant that your use of the Site and the Content will be consistent with these above - listed terms of the
        license provided and will not infringe upon or violate the rights of any other party or breach any contract or
        legal duty to any other parties, or violate any applicable law. The Site may contain links to third-party Web
        sites ("Third-Party Sites") and third-party content ("Third-Party Content") as a service to those interested in
        this information. You use links to Third-Party Sites, and any Third-Party Content or service provided there at
        your own risk. The Company does not monitor or have any control over and makes no claim or representation
        regarding, Third-Party Content or Third-Party Sites.
      </Text>

      <Text as="h3">4. User Restrictions</Text>
      <Text as="p">
        You are specifically restricted from all of the following:
        <ul>
          <li>
            publishing any Website material in any other public or private media forum without the prior consent of the
            Company
          </li>
          <li>selling, sublicensing, and/or otherwise commercializing any Website material;</li>
          <li>publicly performing and/or showing any Website material;</li>
          <li>using this Website in any way that is or may be damaging to this Website;</li>
          <li>using this Website in any way that impacts user access to this Website;</li>
          <li>
            using this Website contrary to applicable laws and regulations, or in any way may cause harm to the Website,
            or to any person or business entity;
          </li>
          <li>
            engaging in any data mining, data harvesting, data extracting or any other similar activity in relation to
            this Website;
          </li>
          <li>using this Website to engage in any advertising or marketing.</li>
        </ul>
        <br />
        Certain areas of this Website are restricted from being accessed by you and the Company may further restrict
        access by you to any areas of this Website, at any time, without your consent. Any user ID and password you may
        have for this Website are confidential and you must maintain confidentiality as well.
      </Text>

      <Text as="h3">5. Copyright</Text>
      <Text as="p">
        The content on the Site, including all information, data, logos, marks, designs, graphics, pictures, sound
        files, other files, and their selection and arrangement, is called "Content". Content provided by Users is
        called "User Content". User Content is that User's property. The Company’s only right to that User Content is
        the limited licenses to it granted in these Terms contained in the section, “Your Content”. Other than the User
        Content, the Site, all Content and all software available on the Site or used to create and operate the Site is
        the property of the Company or its licensors and is protected by international copyright laws, and all rights to
        the Site, such Content and such software are expressly reserved. All trademarks, registered trademarks, product
        names, and company names or logos mentioned in the Site are the property of their respective owners. Reference
        to any products, services, processes or other information (by trade name, trademark, manufacturer, supplier or
        otherwise) does not constitute or imply endorsement, sponsorship or recommendation thereof by the Company.
      </Text>

      <Text as="h3">6. Your Content Uploaded and/or Shared to the Website</Text>
      <Text as="p">
        In these Website Standard Terms and Conditions, “Your Content” shall mean any audio, video text, images, or
        other material you choose to display on this Website. By displaying Your Content, you grant a non-exclusive,
        worldwide irrevocable, sub-licensable license to use, reproduce, adapt, publish, translate, and distribute it in
        any and all media.
        <br />
        <br />
        Your Content must be your own and must not be invading any third-party’s rights. The Company reserves the right
        to remove any of Your Content from this Website at any time without notice.
      </Text>

      <Text as="h3">7. Privacy Statement</Text>
      <Text as="p">
        We are committed to protecting your privacy. Authorized employees within the company, on a need to know basis
        only, use any information collected from individual customers. We constantly review our systems and data to
        ensure the best possible service to our customers. We will investigate any such actions with a view to
        prosecuting and/or taking civil proceedings to recover damages against those responsible as needed. We will not
        sell, share, or rent your personal information to any third party or use your e-mail address for unsolicited
        mail. Any emails sent by this Company will only be in connection with the provision of agreed services and
        products. Client records are regarded as confidential and therefore will not be divulged to any third party,
        other than if legally required to do so to the appropriate authorities.
      </Text>

      <Text as="h3">8. Log Files</Text>
      <Text as="p">
        We may use IP addresses to analyze trends, administer the site, track user’s movement, and gather broad
        demographic information for aggregate use. IP addresses are not linked to personally identifiable information.
        Additionally, for systems administration, detecting usage patterns, and troubleshooting purposes, our web
        servers automatically log standard access information including browser type, access times/open mail, URL
        requested, and referral URL. This information is not shared with third parties and is used only within this
        Company on a need-to-know basis. Any individually identifiable information related to this data will never be
        used in any way different to that stated above without your explicit permission.
      </Text>

      <Text as="h3">9. Cookies</Text>
      <Text as="p">
        Like most interactive web sites this Company’s website [or ISP] uses cookies to enable us to retrieve user
        details for each visit. Cookies may be used in some areas of our site to enable the functionality of this area
        and ease of use for those people visiting. Some of our affiliate partners may also use cookies.
      </Text>

      <Text as="h3">10. Account Registration</Text>
      <Text as="p">
        These terms will apply to email subscriptions and access to any future implementation of any services provided
        by the Company through the site which may require account registration. Please review our Privacy Policy to
        understand how the Company may collect or use the information you provide in registration to any services
        offered through the site. If you register for an account on the Site, you agree to (a) provide accurate,
        current, and complete information as may be prompted by any registration forms on the Site ("Registration
        Data"); (b) maintain the security of your password; (c) maintain and promptly update the Registration Data, and
        any other information you provide to the Site, and to keep it accurate, current and complete; and (d) accept all
        risks of unauthorized access to the Registration Data and any other information you provide to the Site. You are
        responsible for all activity on your Site account.
      </Text>

      <Text as="h3">11. No warranties</Text>
      <Text as="p">
        This Website is provided “as is,” with all faults, and the Company expresses no representations or warranties of
        any kind related to this Website or the materials contained on this Website. Also, nothing contained on this
        Website shall be interpreted or construed as advice and is only disseminated to you, the customer, for
        informational purposes.
        <br />
        <br />
        The Company does not warrant that the service from this site will be uninterrupted, timely or error-free,
        although it is the Company’s goal to provide these services to each user to the best of their ability. By using
        this service you thereby indemnify this Company, its employees, agents, and affiliates against any loss or
        damage, in whatever manner, however caused.
        <br />
        <br />
        While the Company attempts to make your access to and use of the Site safe, the Company does not represent or
        warrant that the Site or any Content are free of viruses, phishing attempts, or other bad actors attempting to
        defraud you as a customer. You shall defend, indemnify and hold harmless Company and the other Released Parties
        from any loss, damages, liabilities, costs, expenses, claims, and proceedings arising out of your use of the
        Site and from the use of the Site by any person to whom you give access to your account, including any claims
        made by any person that any of your User Content infringes the rights, including the intellectual property
        rights, of any third party.
      </Text>

      <Text as="h3">12. Limitation of liability</Text>
      <Text as="p">
        In no event shall Company, nor any of its officers, directors, and employees, shall be held liable for anything
        arising out of or in any way connected with your use of this Website whether such liability is under contract.
        The company, including its officers, directors, and employees shall not be held liable for any indirect,
        consequential or special liability arising out of or in any way related to your use of this Website.
      </Text>

      <Text as="h3">13. Indemnification</Text>
      <Text as="p">
        You, as the website and/or ecosystem user, shall indemnify and hold harmless the Company and its directors,
        officers, employees, agents, stockholders, affiliates, subcontractors, and customers from and against all
        allegations, claims, actions, suits, demands, damages, liabilities, obligations, losses, settlements, judgments,
        costs and expenses (including without limitation attorneys’ fees and costs) which arise out of, relate to or
        result from any act or omission of Company. You also agree to indemnify the Company in any way related to your
        breach of any of the provisions of these Terms and Conditions.
      </Text>

      <Text as="h3">14. Severability</Text>
      <Text as="p">
        If any provision of these Terms is found to be invalid under any applicable law, such provisions shall be
        deleted without affecting the remaining provisions herein.
      </Text>

      <Text as="h3">15. Variation of Terms</Text>
      <Text as="p">
        The company is permitted to revise these Terms at any time as it sees fit, and by using this Website you are
        expected to review these Terms on a regular basis.
      </Text>

      <Text as="h3">16. Assignment</Text>
      <Text as="p">
        The Company is allowed to assign, transfer, and subcontract its rights and/or obligations under these Terms
        without any notification. The Company may also, at any time and without notification, sell their interest in the
        Website and/or financial interest in Decentral Bros to a third party for consideration. However, you are not
        allowed to assign, transfer, or subcontract any of your rights and/or obligations under these Terms.
      </Text>

      <Text as="h3">17. Entire Agreement</Text>
      <Text as="p">
        These Terms constitute the entire agreement between the Company and you in relation to your use of this Website
        and supersede all prior agreements and understandings.
      </Text>

      <Text as="h3">18. Governing Law & Jurisdiction</Text>
      <Text as="p">
        These Terms will be governed by and interpreted in accordance with the laws of the United States, State of
        Colorado, and you submit to the non-exclusive jurisdiction of the United States and those courts located herein
        for the resolution of any disputes.
      </Text>
    </Container>
  )
}

TermsOfService.chains = []

export default TermsOfService
