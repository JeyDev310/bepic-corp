import Layout from "components/layouts/layout";
import OpportuntiyHtml from 'components/opportunity.page/opportunity-html'
import EnrollSection from 'components/home.page/enroll-section'

export default function OpportunityPage (props) {
  return (
    <Layout pageTitle='Opportunity'>
      <OpportuntiyHtml />
      <EnrollSection />
    </Layout>
  )
}