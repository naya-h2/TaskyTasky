import styled from 'styled-components';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/pages/landing/Layout';
import PointSection from '@/components/pages/landing/PointSection';
import MainIntro from '@/components/pages/landing/MainIntro';
import MiniSection from '@/components/pages/landing/MiniSection';
import { DEVICE_SIZE } from '@/styles/DeviceSize';

function Home() {
  const router = useRouter();

  useEffect(() => {
    if (window && window.localStorage.getItem('login')) router.push('/myboard');
  }, []);

  return (
    <Layout>
      <Container>
        <MainIntro />
        <PointSection />
        <MiniSection />
      </Container>
    </Layout>
  );
}

export default Home;

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 120px auto 0;
  padding: 0 30px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 60px;

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    margin-top: 100px;
  }
`;
