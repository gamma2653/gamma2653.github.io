import { createFileRoute } from '@tanstack/react-router'
import Page from '../components/page';

export const Route = createFileRoute('/academics')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Page>
        <div>
            WIP
        </div>
    </Page>
  )
}
