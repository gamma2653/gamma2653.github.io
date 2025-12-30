import { createFileRoute } from '@tanstack/react-router'
import Page from '../components/page';

export const Route = createFileRoute('/software')({
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
