import Image from 'next/image';
import { GridLoader } from 'react-spinners';
import logo from '../../../public/images/logo.png';

const DataLoader = () => {
  return (
    <>
      {/* <PageWrapper> */}
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Image
            src={logo}
            className="ease-nav-brand transition-all duration-200 dark:hidden"
            alt="Company logo"
            width={150}
            height={150}
          />
          {/* <BarLoader olor="#1d4ed8" /> */}
          <GridLoader color="#1d4ed8" />
          
        </div>
      </div>
      {/* </PageWrapper> */}
    </>
  );
};

export default DataLoader;
