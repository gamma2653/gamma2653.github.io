import { createFileRoute } from '@tanstack/react-router'
import Page from '../components/page';

export const Route = createFileRoute('/projects')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Page>
        <div></div>
    </Page>
  )
}
