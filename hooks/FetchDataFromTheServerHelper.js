import axios from 'axios';
import { useEffect, useState } from 'react';

const useFetchData = (endPoint, setData) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post(`/api/GetData`, { endPoint });
        console.log('Response data is:', response.data);
        setData(response.data); // Assuming response data is the final data we need
      } catch (error) {
        // Axios throws an error when the server returns a status outside the 2xx range
        setError(error.response?.statusText || error.message);
        console.error('Fetch error:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endPoint]); // Removed setDataContext from the dependency array

  return { loading, error };
};

// Fetch and map the client data on the disbursemet UI
// export const getClients = (clientEndpoint, setData) => {
//   useEffect(() => {
//     const fetchClients = async () => {
//       try {
//         const response = await axios.post(`/api/admin/GetData`, {
//           endPoint: clientEndpoint, // Changed from clientEndpoint to endPoint
//         });
//         if (response.data && Array.isArray(response.data)) {
//           setData(
//             response.data.map((client) => ({
//               id: client.id,
//               name: `${client.first_name} ${client.last_name}`,
//             })),
//           );
//         } else {
//           console.error('Invalid response format:', response.data);
//         }
//       } catch (error) {
//         console.error('Failed to fetch clients:', error);
//       }
//     };

//     fetchClients();
//   });
// };

export default useFetchData;
