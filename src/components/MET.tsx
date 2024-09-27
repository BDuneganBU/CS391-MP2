import styled from "styled-components";

const AllItemsDiv=styled.div`
    display: flex;
    flex-flow: row wrap;    
    justify-content: space-evenly;
    background-color: bisque;
`;

interface MuseumItem {
    objectID: number;
    title: string;
    artistDisplayName: string;
    primaryImage: string;
    status: string;
  }

const SingleItemDiv=styled.div<{status: string}>`
    display: flex;
    flex-direction: column;   
    justify-content: center;
    max-width: 30%;
    padding: 2%;
    margin: 1%;
    background-color: 'black';
    color: 'white';
    border: 3px darkred solid;
    font: italic small-caps bold calc(2px + 1vw) Papyrus, fantasy;
    text-align: center;
`;

export default function MET(props : { data:MuseumItem[]} ){
    return (
        <AllItemsDiv >
            {props.data.map(item => (
                <SingleItemDiv key={item.objectID} status={item.status}>
                    <h3>Title: {item.title}</h3>
                    <h3>ID: {item.objectID}</h3>
                    <p>{item.artistDisplayName}</p>
                    {item.primaryImage ? (
                    <img src={item.primaryImage} alt={item.title} style={{ width: '100%' }} />
                        ) : (
                    <img src="" alt="No Image Found" style={{ width: '100%' }} />
                    )}
                </SingleItemDiv>
            ))}
        </AllItemsDiv>
    );
}