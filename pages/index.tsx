import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@libs/redux/modules';
import { META_COMMON, META_PAGE } from '@containers/meta';
import SEO from '@components/SEO';
import withAuth from '@components/HOC/withAuth';
import MobileLayout from '@components/Layout/Mobile';
import DesktopLayout from '@components/Layout/Desktop';
import MainComponent from '@components/Main';

type TProps = {
  pathName: string;
  userDevice: string;
  userOS: string;
  brand: string | null;
  group: string | null;
  model: string | null;
  order: string | null;
  page: string | null;
};

const Home = ({ userDevice, brand, group, model, order, page }: TProps) => {
  // Root State
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  // Variable
  const meta = {
    page_title: META_PAGE.main.page_title,
    page_description: META_COMMON.site_description,
    page_cannonical_link: META_PAGE.main.page_cannonical_link,
    page_image: META_COMMON.site_image,
  };

  // render layout
  const renderLayout = useCallback(() => {
    if (isLoggedIn) {
      switch (userDevice) {
        case 'mobile':
          return (
            <MobileLayout>
              <MainComponent brand={brand} group={group} model={model} order={order} page={page} />
            </MobileLayout>
          );
        case 'desktop':
          return (
            <DesktopLayout brand={brand} group={group} model={model}>
              <MainComponent brand={brand} group={group} model={model} order={order} page={page} />
            </DesktopLayout>
          );
      }
    }
  }, [isLoggedIn, brand, group, model, order, page]);

  return <SEO meta={meta}>{renderLayout()}</SEO>;
};

export default withAuth(Home);

export const getServerSideProps = async (context: any) => {
  const location = context.resolvedUrl;
  const brand = context.query.brand ? context.query.brand : null;
  const group = context.query.group ? context.query.group : null;
  const model = context.query.model ? context.query.model : null;
  const order = context.query.order ? context.query.order : 'recent';
  const page = context.query.page ? context.query.page : '1';
  return {
    props: {
      brand: brand,
      group: group,
      model: model,
      order: order,
      page: page,
    },
  };
};
