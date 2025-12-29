import { createFileRoute } from '@tanstack/react-router'
import Page from '../components/page';

export const Route = createFileRoute('/contact')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Page>
        <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScIwxov4hnAChB-_kTPSdpcfdKtcg8JFmY09H5j781FYYeqXg/viewform?embedded=true" width="640" height="1200" frameborder="0" marginheight="0" marginwidth="0" className="w-full text-black dark:text-white">Loading…</iframe>
    </Page>
  )
}
