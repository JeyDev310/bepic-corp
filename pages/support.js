import Layout from "components/layouts/layout";
import SupportHtml from 'components/support.page/support-html'
import EnrollSection from 'components/home.page/enroll-section'

export default function SupportPage (props) {
  return (
    <Layout pageTitle='Support'>
      <SupportHtml />
      <EnrollSection />
    </Layout>
  )
}
