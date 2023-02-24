import { META_COMMON, META_PAGE } from '@containers/meta';
import SEO from '@components/SEO';
import SignIn from '@components/SignIn';

export default function signinPage() {
  // Variable
  const meta = {
    page_title: META_PAGE.signin.page_title,
    page_description: META_COMMON.site_description,
    page_cannonical_link: META_PAGE.signin.page_cannonical_link,
    page_image: META_COMMON.site_image,
  };

  return (
    <SEO meta={meta}>
      <SignIn />
    </SEO>
  );
}
