import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import PaginationStyles from './PaginationStyles'


export default function Pagination({ pagesArray, params, setParams, ...props }) {
    return (
        <View style={PaginationStyles.container}{...props}>
            {pagesArray?.map(pageNumber =>

                <TouchableOpacity
                    key={pageNumber}
                    onPress={() => { if (params?.currentPage != pageNumber) setParams({ ...params, currentPage: pageNumber }) }}
                    style={PaginationStyles.button}
                ><View
                    style={pageNumber === params?.currentPage ? PaginationStyles.currentpaginationEl : PaginationStyles.paginationEl}
                >
                        <Text>{pageNumber}</Text>
                    </View>
                </TouchableOpacity>

            )}
        </View>
    )
}