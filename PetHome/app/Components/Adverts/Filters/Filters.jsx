import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Switch } from 'react-native';
import FiltersStyles from './FiltersStyles';

export default function Filters({ isUserAdverts, queryParams, setQueryParams }) {
    const [isVisible, setIsVisible] = useState(false)
    const [queryParamsCopy, setQueryParamsCopy] = useState({
        advertsLimit: queryParams?.advertsLimit.toString(),
        costFrom: queryParams?.costFrom.toString(),
        costTo: queryParams?.costTo.toString(),
        isDatesFit: queryParams?.isDatesFit
    })

    const handleApply = () => {
        if (queryParamsCopy?.advertsLimit.trim() === "" || isNaN(queryParamsCopy?.advertsLimit) || parseInt(queryParamsCopy?.advertsLimit) <= 0) {
            alert("Please enter a valid Adverts Limit.");
            return;
        }
        if (queryParamsCopy?.costFrom.trim() === "" || isNaN(queryParamsCopy?.costFrom) || parseInt(queryParamsCopy?.costFrom) <= 0) {
            alert("Please enter a valid Cost From.");
            return;
        }
        if (queryParamsCopy?.costTo.trim() === "" || isNaN(queryParamsCopy?.costTo) || parseInt(queryParamsCopy?.costTo) <= 0) {
            alert("Please enter a valid Cost To.");
            return;
        }

        if (parseInt(queryParamsCopy?.costTo) > 1000000) {
            alert("Cost To cannot exceed 1000000.");
            return;
        }

        if (parseInt(queryParamsCopy?.costTo) < parseInt(queryParamsCopy?.costFrom)) {
            alert("Cost To cannot be less than costFrom.");
            return;
        }

        setQueryParams({ ...queryParams, ...queryParamsCopy });
    }

    return (
        <View style={[FiltersStyles.container, FiltersStyles.shadow]}>
            {isVisible ?
                <View style={{ width: '100%', alignItems: 'center' }}>
                    <View>
                        <Text style={FiltersStyles?.label}>Оголошень на сторінку</Text>
                        <TextInput
                            style={FiltersStyles.input}
                            value={queryParamsCopy?.advertsLimit}
                            onChangeText={text => setQueryParamsCopy({ ...queryParamsCopy, advertsLimit: text })}
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={FiltersStyles.costSelectionContainer}>
                        <Text style={FiltersStyles?.label}>Ціна від:</Text>
                        <TextInput
                            style={FiltersStyles.input}
                            value={queryParamsCopy?.costFrom}
                            onChangeText={text => setQueryParamsCopy({ ...queryParamsCopy, costFrom: text })}
                            keyboardType="numeric"
                        />
                        <Text style={FiltersStyles?.label}>Ціна до:</Text>
                        <TextInput
                            style={FiltersStyles.input}
                            value={queryParamsCopy?.costTo}
                            onChangeText={text => setQueryParamsCopy({ ...queryParamsCopy, costTo: text })}
                            keyboardType="numeric"
                        />
                    </View>

                    {
                        !isUserAdverts && <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={FiltersStyles?.label}>У Ваші вільні дати</Text>
                            <Switch
                                value={queryParamsCopy?.isDatesFit}
                                onValueChange={(e) => setQueryParamsCopy({ ...queryParamsCopy, isDatesFit: e })}
                            />
                        </View>
                    }
                    <TouchableOpacity style={FiltersStyles.apply} onPress={handleApply}>
                        <Text>Застосувати</Text>
                    </TouchableOpacity>
                </View>
                : <View style={{ width: '100%' }}><TouchableOpacity style={FiltersStyles.showFiltersButton} onPress={() => setIsVisible(!isVisible)}><Text>Показати фільтри</Text></TouchableOpacity></View>
            }
        </View>
    );
}
