import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Props {
  type: 'main' | 'large' | 'small';
}

function Logo({ type }: Props) {
  const [path, setPath] = useState('/');

  useEffect(() => {
    if (window && window.localStorage.getItem('login')) setPath('/myboard');
  }, []);

  return (
    <Link href={path}>
      {type === 'main' && <Image alt="홈 바로가기" src="/images/logo_letter.svg" width={121} height={39} />}
      {type === 'large' && <Image alt="홈 바로가기" src="/images/logo_big.svg" width={200} height={200} />}
      {type === 'small' && <Image alt="홈 바로가기" src="/images/logo_icon.svg" width={40} height={40} />}
    </Link>
  );
}

export default Logo;
