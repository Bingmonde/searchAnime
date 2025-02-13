import React from 'react';
import {StyleSheet, Font} from '@react-pdf/renderer';
import font from "./fonts/NotoSansJP-Regular.otf";

// Create styles
const styles = StyleSheet.create({
    page: {
        padding: 20,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 500,
        marginBottom: 10,
        textAlign: 'center',
        color: '#4e8004',
    },
    subtitle: {
        fontSize: 16
    },
    label: {
        paddingRight: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    value: {
        color: '#464454',
        fontSize: 12,
    },
    backgroundStyle: {
        fontSize: 12,
        color: 'gray',
    },
    episodesStyle: {
        color: 'red',
        textDecoration: 'underline',
    },
    animeImgContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },
    animeImg: {
        width: '50%',
        height: 'auto',
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sectionOnRow: {
        marginBottom: 10,
        padding: 10,
        flexDirection: 'row',
    },
    section: {
        marginBottom: 10,
        padding: 10,
    },
    characterContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        justifyContent: 'center',
    },
    charItem: {
        flex: '0 1 30%',
        backgroundColor: '#f5f5f5',
        padding: 10,
        border: '1px solid #ccc',
        borderRadius: 5,
        textAlign: 'center',
    },
    charImg: {
        width: '100%',
        height: 'auto',
        marginBottom: 5,
    },
    smallImg: {
        width: '10%',
        height: 'auto',
        alignSelf: 'flex-start',
        marginBottom: 5,
    },
    charDesc : {
        width: '100%',
        alignSelf: 'flex-end',
        marginBottom: 5,
        marginLeft: 5,
        color: '#464454',
        fontSize: 12,
    },
    charBox: {
        padding: 10,
    },



    animeDetail: {
        marginBottom: 10,
    },
    header: {
        fontSize: 20,
        marginBottom: 5,
        fontWeight: 500,
    },
    jpChars: {
        fontFamily: 'NotoSansJP',
        color: '#9c4873',
    },
});
// japanese language
Font.register({
    family: "NotoSansJP",
    src: font}, );


export default styles;
