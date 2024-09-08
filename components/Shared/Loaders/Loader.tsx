import Image from 'next/image';
import { GridLoader } from 'react-spinners';
import logo from '../../../public/images/logo.png';

const DataLoader = () => {
  return (
    <>
      {/* <PageWrapper> */}
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
         
          {/* <BarLoader olor="#1d4ed8" /> */}
          <GridLoader color="#1d4ed8" />
          
        </div>
      </div>
      {/* </PageWrapper> */}
    </>
  );
};

export default DataLoader;
