import React, { useEffect, useCallback } from 'react'
import { View, StyleSheet, FlatList, Text } from 'react-native'
import { Searchbar } from 'react-native-paper';
import { CardContainer, AnimatedLoader } from '../../component';
import { useDispatch, useSelector } from "react-redux"
import { getMovieData, getSucessData } from "../../redux/actions/MovieAction"
import { debounce } from "lodash"
import MaterialIcon from "react-native-vector-icons/MaterialIcons"
import { setItem, getItem } from "../../session/SessionManager"
import { Card, Button } from 'react-native-paper';
import Toast from 'react-native-tiny-toast'



const Spinner = AnimatedLoader(View);
export default function PageOne() {
    const dispatch = useDispatch()
    const { movieData, loading } = useSelector(state => state.movie_data)
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);

    const updateQuery = () => {
        if (searchQuery.length < 1) {
            dispatch(getSucessData([]))
            return
        }

        dispatch(getMovieData(searchQuery))
    };
    const delayedQuery = useCallback(debounce(updateQuery, 300), [searchQuery]);
    useEffect(() => {
        delayedQuery();

        // Cancel the debounce on useEffect cleanup.
        return delayedQuery.cancel;
    }, [searchQuery, delayedQuery]);

    const updateSortlisted = async (item) => {
        const toast = Toast.showLoading('Loading...')
        const data = await getItem("SHORTLISTED");
        if (data) {
            data.push(item)

            const filteredArr = data.reduce((acc, current) => {
                const x = acc.find(item => item.imdbID === current.imdbID);
                if (!x) {
                    return acc.concat([current]);
                } else {
                    return acc;
                }
            }, []);
            await setItem("SHORTLISTED", filteredArr)

            Toast.hide(toast)
            Toast.showSuccess("Shortlisted", Toast.position.CENTER);


        }
        else {
            await setItem("SHORTLISTED", [item])
            Toast.hide(toast)
            Toast.showSuccess("Shortlisted", Toast.position.CENTER);
        }




    }


    return (
        <View style={styles.root}>
            <Searchbar

                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
            />

            <Spinner style={{ flex: 1 }} isLoading={loading} >

                {movieData.length === 0 ? <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

                    <MaterialIcon name="search" size={50} color='gray' ></MaterialIcon>
                    <Text>No Result found</Text>
                </View> :
                    <FlatList keyboardDismissMode="on-drag" style={{ flex: 1 }} numColumns={2} keyExtractor={(item, idx) => idx.toString()} data={movieData} renderItem={({ item, idx }) => {
                        return <CardContainer item={item} >
                            <Card.Actions>
                                <Button onPress={() => updateSortlisted(item)} >Shortlist</Button>
                            </Card.Actions>

                        </CardContainer>

                    }} ></FlatList>
                }
            </Spinner>





        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    emptyStateContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }


})