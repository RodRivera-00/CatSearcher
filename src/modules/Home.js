import React, {useState, useEffect} from "react"
import { useParams } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import CatSearch from "../components/CatSearch"
import CatCard from "../components/CatCard";
import { CatContext } from "../context/CatProvider";
import { FetchImages } from "../helpers/Fetchers";


export default function Home() {
  const [catSearch, setCatSearch] = useState('')
  const [cats,setCats] = useState([])
  const [breedList, setBreedList] = useState([])
  const [page, setPage] = useState(-1)
  const [loadMore, setLoadMore] = useState(false)
  const {breedid} = useParams()
  const dispatchUserEvent = (actionType, payload) => {
		switch (actionType) {
			case 'SEARCH_CATS':
          //set to default values if breed value is changed
          if(payload !== ''){
            setCats([])
            setLoadMore(false)
            setPage(0)
          }else{
            setCats([])
            setLoadMore(false)
            setPage(-1)
          }
          setCatSearch(payload)
				return;
			case 'SET_BREED':
          //set breed list from api to state
          setBreedList(payload)
          return;
      case 'ADD_CATS':
          if(page === 0){
            setCats(payload)
          }else{
            setCats([...cats, ...payload])
          }
				  return;
      case 'ADD_PAGE':
          if(loadMore){
            setPage(pageCount => pageCount + 1)
            setLoadMore(false)
          }else{
            //alert no more pages available
          }
          return;
      case 'SET_LOADMORE':
          setLoadMore(payload)
          return;
			default:
				return;
		}
	}
  //Fetch images if there is a valid breed
  useEffect(() => {
    if(breedid !== ''){
      setCatSearch(breedid)
      setPage(0)
      FetchImages(dispatchUserEvent, breedid, 0, cats.length)
    }
  }, [])
  //Fetch images on change of page/catSearch
  useEffect(() =>{
    if(page !== -1){
      FetchImages(dispatchUserEvent, catSearch, page, cats.length)
    }
  }, [page,catSearch])
  return (
    <Container fluid="md" style={{paddingTop: 50}}>
      <CatContext.Provider value={{catSearch, cats, breedList, loadMore, dispatchUserEvent}}>
          <CatSearch />    
          <CatCard /> 
      </CatContext.Provider>
      <Button hidden={!loadMore} style={{marginTop: 20}} onClick={() => dispatchUserEvent('ADD_PAGE')}>Load More</Button>
    </Container>
  );
}