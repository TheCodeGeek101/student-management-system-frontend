import  {FadeLoader} from 'react-spinners';

const TransactionLoader = () => {
  return (
    <>
      {/* <PageWrapper> */}
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <FadeLoader color="#1d4ed8" />
          <p>Verifying transaction, Please wait!...</p>
        </div>
      </div>
      {/* </PageWrapper> */}
    </>
  );
};

export default TransactionLoader;