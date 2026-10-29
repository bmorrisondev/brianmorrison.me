import type { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'
import Container from '~/components/Container'
import { buildHeader } from '~/utils'

export const meta: MetaFunction = () => buildHeader({
  pageTitle: 'Hermes YouTube Analytics Terms of Use',
  description: 'Terms of Use for the private Hermes YouTube Analytics integration.'
})

export default function HermesYouTubeAnalyticsTerms() {
  return (
    <Container className="max-w-3xl">
      <article className="pb-8">
        <p className="text-sm text-neutral-600 mb-2">Hermes YouTube Analytics</p>
        <h1>Terms of Use</h1>
        <p className="text-sm text-neutral-600">Last updated: October 29, 2026</p>

        <h2>Scope</h2>
        <p>
          These Terms of Use apply only to Hermes YouTube Analytics (the “Integration”), a
          private, owner-operated analytics tool maintained by Brian Morrison II. They do not
          govern BrianMorrison.me generally, client services, or any other application or service.
        </p>

        <h2>Permitted use</h2>
        <p>
          The Integration is intended only for Brian Morrison II and for YouTube channels that he
          is authorized to access. It is a read-only tool for reviewing channel and video
          analytics. It does not provide a public signup, paid service, or permission for others
          to use it without the owner’s express authorization.
        </p>

        <h2>YouTube terms</h2>
        <p>
          The Integration uses YouTube API Services. By using the Integration, an authorized user
          agrees to be bound by the{' '}
          <a href="https://www.youtube.com/t/terms" target="_blank" rel="noreferrer">
            YouTube Terms of Service
          </a>. Use of the Integration is also subject to the applicable YouTube API Services
          terms and policies.
        </p>

        <h2>Authorization and access</h2>
        <p>
          Google authorization is used only to retrieve data from channels the authorizing account
          may access. The owner may stop using the Integration or revoke its authorization at any
          time through Google’s account-permissions settings. The Integration may also be changed,
          paused, or discontinued at any time.
        </p>

        <h2>No warranties</h2>
        <p>
          The Integration is provided for personal use as available. Analytics data may be delayed,
          incomplete, unavailable, or changed by YouTube. The owner does not promise uninterrupted
          availability, accuracy, or fitness for any particular purpose. Do not rely on the
          Integration as the sole record of YouTube activity or performance.
        </p>

        <h2>Privacy</h2>
        <p>
          Use of the Integration is also subject to the{' '}
          <Link to="/hermes-youtube-analytics/privacy-policy">Hermes YouTube Analytics Privacy Policy</Link>.
        </p>

        <h2>Changes and contact</h2>
        <p>
          These Terms may be updated if the Integration changes. Questions about these Terms can
          be sent through the <Link to="/contact">BrianMorrison.me contact page</Link>.
        </p>
      </article>
    </Container>
  )
}
