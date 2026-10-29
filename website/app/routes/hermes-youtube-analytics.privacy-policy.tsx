import type { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'
import Container from '~/components/Container'
import { buildHeader } from '~/utils'

export const meta: MetaFunction = () => buildHeader({
  pageTitle: 'Hermes YouTube Analytics Privacy Policy',
  description: 'Privacy Policy for the private Hermes YouTube Analytics integration.'
})

export default function HermesYouTubeAnalyticsPrivacyPolicy() {
  return (
    <Container className="max-w-3xl">
      <article className="pb-8">
        <p className="text-sm text-neutral-600 mb-2">Hermes YouTube Analytics</p>
        <h1>Privacy Policy</h1>
        <p className="text-sm text-neutral-600">Last updated: October 29, 2026</p>

        <p>
          This Privacy Policy applies only to Hermes YouTube Analytics (the “Integration”), a
          private, owner-operated tool maintained by Brian Morrison II. The Integration is used
          to review analytics for YouTube channels that Brian is authorized to access. It is not
          a public product, does not offer public accounts, and is not intended for use by anyone
          other than its owner and expressly authorized channel owners.
        </p>

        <h2>Use of YouTube API Services</h2>
        <p>
          The Integration uses YouTube API Services, including YouTube Data API and YouTube
          Analytics API endpoints, to retrieve information for authorized channels. Google’s
          <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer"> Privacy Policy</a>{' '}
          also applies to the use of Google and YouTube services.
        </p>

        <h2>Information the Integration accesses and stores</h2>
        <p>
          When Brian authorizes the Integration through Google, it may receive authorization
          credentials and access YouTube API data for the selected channels. The Integration is
          designed to retrieve and store channel and video identifiers, channel and video titles,
          video publication information, daily aggregate metrics such as views and watch time,
          traffic-source metrics, collection timestamps, and collection-status records.
        </p>
        <p>
          Authorization credentials are used to make authenticated, read-only requests to Google.
          Analytics history is stored in an owner-controlled SQLite database. Credentials are
          managed through the owner’s configured secret-management system; they are not included
          in analytics reports or intentionally displayed through the Integration.
        </p>

        <h2>How information is used</h2>
        <p>
          The Integration uses this information solely to collect, organize, compare, and review
          the authorized channels’ performance over time. It does not upload, edit, delete, or
          publish YouTube content. The Integration is not used to sell personal information,
          serve advertising, or create audience profiles for other people.
        </p>
        <p>
          The owner may use stored analytics to prepare private weekly reports and AI-assisted
          summaries for the authorized channel owners. Where configured, selected analytics data
          may be provided to an AI service chosen by the owner solely to generate those summaries.
          Those summaries are for the authorized channel owners and are not shared as a public
          analytics product.
        </p>

        <h2>Sharing</h2>
        <p>
          The Integration is designed for the owner’s own authorized channels. Data may be handled
          by the owner’s configured infrastructure, secret-management services, and, where the
          summary feature is enabled, an AI service selected by the owner, only as needed to
          operate the Integration and prepare owner-only summaries. The Integration does not sell
          YouTube API data or use it for advertising. Data may also be disclosed when required by
          law.
        </p>

        <h2>Retention and deletion</h2>
        <p>
          Analytics API data and authorized statistics may be retained for personal historical
          reporting while the authorization remains active and the data is needed for that purpose.
          Other stored YouTube API data is refreshed or deleted as required by the applicable
          YouTube API Services policies. The owner reviews, at least every 30 days, whether the
          authorization remains active before retaining authorized analytics data beyond that
          period.
        </p>
        <p>
          An authorized channel owner can request deletion of stored data by using the{' '}
          <Link to="/contact">contact page</Link> and identifying the channel and request.
          Deletion removes the requested records held by the Integration; it does not delete
          information from YouTube. The owner handles requests, and deletes data associated with
          revoked authorization, as soon as possible and no later than 7 calendar days.
        </p>

        <h2>Revoking access</h2>
        <p>
          Google authorization may be revoked at any time through the{' '}
          <a href="https://myaccount.google.com/permissions" target="_blank" rel="noreferrer">
          Google Account third-party access page
          </a>. Revoking access stops future authenticated collection. The Integration must delete
          API data obtained under the revoked authorization as described above; the contact process
          can also be used to request deletion directly.
        </p>

        <h2>Security</h2>
        <p>
          The owner uses reasonable measures intended to limit access to the Integration and its
          stored data. No system can guarantee absolute security.
        </p>

        <h2>Contact and changes</h2>
        <p>
          Questions, complaints, or deletion requests about this policy or the Integration can be
          sent through the <Link to="/contact">BrianMorrison.me contact page</Link>. This policy
          may be updated when the Integration’s data practices change.
        </p>
      </article>
    </Container>
  )
}
