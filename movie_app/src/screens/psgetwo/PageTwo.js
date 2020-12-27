import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, FlatList } from 'react-native'
import { Appbar } from 'react-native-paper';
import { setItem, getItem } from "../../session/SessionManager"
import { CardContainer } from '../../component';
import { Card, Button } from 'react-native-paper';
import Toast from 'react-native-tiny-toast'

export default function PageTwo({ navigation }) {
    const [shortlisted, setshortlisted] = useState([])

    useEffect(() => {

        const unsubscribe = navigation.addListener("focus", () => {
            getSessionData();
        });

        const getSessionData = async () => {
            const sessionData = await getItem("SHORTLISTED")
            setshortlisted(sessionData)
        }

        return unsubscribe;
    }, [])


    const updateSortlisted = async (id) => {
        const toast = Toast.showLoading("Removing...")
        const data = await getItem("SHORTLISTED");
        if (data) {
            const arr = data.filter(item => item.imdbID != id)
            setshortlisted(arr)
            await setItem("SHORTLISTED", arr)
            Toast.hide(toast)
            Toast.showSuccess("Removed", Toast.position.CENTER)

        }
    }
    return (
        <View style={styles.root}>

            <Appbar.Header>
                <Appbar.Content title={"Shortlisted Movies"}></Appbar.Content>
            </Appbar.Header>

            {
                shortlisted.length === 0 ?

                    <View style={styles.emptyContainer}>
                        <Text>No Record Found</Text>
                    </View>
                    :

                    <FlatList numColumns={2} keyExtractor={(item, idx) => `item${idx}`} data={shortlisted} renderItem={({ item, idx }) =>
                        <CardContainer item={item}>

                            <Card.Actions>
                                <Button onPress={() => updateSortlisted(item.imdbID)} >Remove</Button>
                            </Card.Actions>


                        </CardContainer>} ></FlatList>

            }

        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }


})