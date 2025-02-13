import styles from './pdfStyle';
import {Document, Image, Page, Text, View} from "@react-pdf/renderer";
import React from "react";

export const MyDocuAnimeList = ({animeList}) => (
    <Document>
        {animeList.map((animeDetails, index) => (
            <Page size="A4" style={styles.page}>
                <Text style={styles.title}>{animeDetails.title}</Text>

                <View style={styles.animeImgContainer}>
                    {animeDetails.image_url && (
                        <Image
                            src={`http://localhost:3001/proxy-image?url=${encodeURIComponent(animeDetails.image_url)}`}
                            style={styles.animeImg}
                        />
                    )}
                </View>

                <View style={styles.sectionOnRow}>
                    <Text style={styles.label}>
                        English title:
                    </Text>
                    <Text style={styles.value}>
                        {animeDetails.title_english}
                    </Text>
                </View>
                <View style={styles.sectionOnRow}>
                    <Text style={styles.label}>
                        Native title:
                    </Text>
                    <Text style={[styles.value, styles.jpChars]}>
                        {animeDetails.title_japanese}
                    </Text>
                </View>
                <View style={styles.sectionOnRow}>
                    <Text style={styles.label}>
                        Genre:
                    </Text>
                    <Text style={styles.value}>
                        {animeDetails.genre}
                    </Text>
                </View>

                <View style={styles.sectionOnRow}>
                    <Text style={styles.label}>
                        Status:
                    </Text>
                    <Text style={styles.value}>
                        {animeDetails.status.toLowerCase()}
                    </Text>
                </View>
                <View style={styles.sectionOnRow}>
                    <Text style={styles.label}>
                        Season:
                    </Text>
                    <Text style={styles.value}>
                        {animeDetails?.season?.toLowerCase()}
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}>
                        Synopsis:
                    </Text>
                    <Text style={styles.value}>
                        {animeDetails.description}
                    </Text>
                </View>

                <View style={styles.sectionOnRow}>
                    <Text style={[styles.label, styles.episodesStyle]}>
                        Num of episodes:
                    </Text>
                    <Text style={styles.label}>
                        {animeDetails.episodes}
                    </Text>
                </View>
                {animeDetails.episodes_info.length === 0 && <Text style={styles.value}>No information about episode detail.</Text>}

                {animeDetails.episodes_info.length > 0 && list3items1Row(animeDetails.episodes_info).map((episodes, index) =>
                    (
                        <View key={index} style={styles.characterContainer}>
                            {episodes.map((episode, index) => (
                                <View key={index} style={styles.charItem}>
                                    <Text style={styles.value}>
                                        {episode.title.split('-')[0]} {episode.title.split('-')[1]}
                                    </Text>
                                    <view>
                                        <Image
                                            src={`http://localhost:3001/proxy-image?url=${encodeURIComponent(episode.thumbnail)}`}
                                            style={styles.charImg}
                                        />
                                    </view>

                                </View>
                            ))}

                        </View>
                    ))
                }
                <View style={styles.sectionOnRow}>
                    <Text style={styles.label}>
                        Main characters:
                    </Text>
                </View>
                {animeDetails.characters.map((character) =>
                    <View  key={character.id}>
                        <Text style={styles.label}>
                            {character.name}
                        </Text>
                        <Text style={[styles.label, styles.jpChars]}>
                            {character.name_native}
                        </Text>
                        <view>
                            {character.image_url && (
                                <Image
                                    src={`http://localhost:3001/proxy-image?url=${encodeURIComponent(character.image_url)}`}
                                    style={styles.smallImg}
                                />
                            )}
                            <Text style={[styles.label, styles.charDesc]}>
                                {character.description}
                            </Text>
                        </view>
                    </View>
                )}
                {animeDetails.characters.length === 0 && <Text style={styles.value}>No information about characters</Text>}

            </Page>
        ))}
    </Document>

)


const list3items1Row = (arr) => {
    return arr.reduce((acc, _, index) => {
        if (index % 3 === 0) {
            acc.push(arr.slice(index, index + 3));
        }
        return acc;
    }, []);
};