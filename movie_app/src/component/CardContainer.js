import React, { Children } from 'react'
import { Card, Text, } from 'react-native-paper';
import { Dimensions, View } from 'react-native';

export default function CardContainer({ item: { Poster, Title, Year }, ...props }) {

    return (
        <View style={{ width: Dimensions.get("window").width * 0.5, padding: 5 }}>
            <Card elevation={10}  >
                <Card.Cover style={{ maxHeight: 200 }} sresizeMode="contain" source={{ uri: Poster === "N/A" ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV0q2ggMmscByTHzOn3mmJ_tKly_kgcPmUwQ&usqp=CAU" : Poster }} />
                <Card.Content>
                    <Text numberOfLines={2} style={{ fontSize: 14, fontWeight: "bold", textAlign: "left" }}  >{Title + " - "}


                        <Text style={{ fontSize: 14, fontWeight: "400", textAlign: "left" }}  >{Year}</Text>
                    </Text>

                </Card.Content>
                {props.children}
            </Card>
        </View>

    )
}
