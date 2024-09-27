import useSWR from "swr";
import MET from "./components/MET.tsx";
import styled from "styled-components";
import { useEffect, useState } from 'react';

interface MuseumItem {
  objectID: number;
  title: string;
  artistDisplayName: string;
  primaryImage: string;
  status: string;
}


const ParentDiv=styled.div`
    width: 80vw;
    margin: auto;
    border: 5px darkgoldenrod solid;
`;


export default function App() {
  
  //Call the metmuseum API for all items which are both PublicDomain and Paintings
  const{data, error} = useSWR("https://collectionapi.metmuseum.org/public/collection/v1/search?isPublicDomain=true&q=painting", (url) =>
    fetch(url).then(res=>res.json())
  );

  //useState hook to update the list of MuseumItems within the second API call
  const [items, setItems] = useState<MuseumItem[]>([]);


  useEffect(() => {
    if (data && data.objectIDs) {
      // Get random IDs from the list of returned ids which are both public domain and a painting
      const randomIDs = getRandomElements(data.objectIDs, 20);
      // Call the metmuseum API for each of the random IDs selected
      const itemsPromises = randomIDs.map(id =>
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`).then(res => res.json())
      );

      //Promise is needed to wait for all the pictures before the HTML is returned
      Promise.all(itemsPromises).then(museumItems => {
        setItems(museumItems);
      });
    }
  }, [data]);


  if(error) return <h1>This {error} happened</h1>
  if(!data) return <h1>Loading Page</h1>

  //console.log(data)

  //items contains the data and needs to be passed as the data parameter in the MET component
  return (
    <ParentDiv>
      <MET data={items}/>
    </ParentDiv>
  );
}

function getRandomElements(array: number[], count: number) {
  //randomly sorts the array then selects the first i=count index to return
  const rand = array.sort(() => 0.5 - Math.random());
  return rand.slice(0, count);
};
