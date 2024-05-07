import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Switch } from 'react-native';
import FiltersStyles from './FiltersStyles';
import shallowEqual from '../../../Pages/Me/helper';
import DropDownPicker from 'react-native-dropdown-picker';

export default function Filters({ isUserAdverts, queryParams, setQueryParams }) {
    const [isVisible, setIsVisible] = useState(false)
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'По 4', value: 4 },
        { label: 'По 8', value: 8 },
        { label: 'По 12', value: 12 }
    ]);
    const [queryParamsCopy, setQueryParamsCopy] = useState({
        advertsLimit: queryParams?.advertsLimit.toString(),
        costFrom: queryParams?.costFrom.toString(),
        costTo: queryParams?.costTo.toString(),
        isDatesFit: queryParams?.isDatesFit
    })

    const handleApply = () => {
        if (queryParamsCopy?.advertsLimit.trim() === "" || isNaN(queryParamsCopy?.advertsLimit) || parseInt(queryParamsCopy?.advertsLimit) <= 0) {
            alert("Оберіть коректну кількість оголошень на сторінку");
            return;
        }
        if (queryParamsCopy?.costFrom.trim() === "" || isNaN(queryParamsCopy?.costFrom) || parseInt(queryParamsCopy?.costFrom) <= 0) {
            alert("Введіть коректну мінімальну суму");
            return;
        }
        if (queryParamsCopy?.costTo.trim() === "" || isNaN(queryParamsCopy?.costTo) || parseInt(queryParamsCopy?.costTo) <= 0) {
            alert("Введіть коректну максимальну суму");
            return;
        }

        if (parseInt(queryParamsCopy?.costTo) > 100000) {
            alert("Сума не може бути більше за 100000");
            return;
        }

        if (parseInt(queryParamsCopy?.costTo) < parseInt(queryParamsCopy?.costFrom)) {
            alert("Максимальна сума не може бути меншою за мінімальну");
            return;
        }
        const temp = { ...queryParams, ...queryParamsCopy }

        if (!shallowEqual(queryParams, temp)) {
            setQueryParams({ ...queryParams, ...queryParamsCopy, currentPage: 1 });
            console.log(queryParams);
        } else {
            setIsVisible(!isVisible)
        }
    }

    return (
        <View style={[FiltersStyles.container, FiltersStyles.shadow]}>
            {isVisible ?
                <View style={{ width: '100%', alignItems: 'center' }}>
                    <View style={{ zIndex: 5 }}>
                        <Text style={FiltersStyles?.label}>Оголошень на сторінку</Text>
                        <DropDownPicker
                            open={open}
                            value={parseInt(queryParamsCopy?.advertsLimit)}
                            items={items}
                            setOpen={setOpen}
                            onSelectItem={(item) => setQueryParamsCopy({ ...queryParamsCopy, advertsLimit: String(item.value), currentPage: 1 })}
                            setItems={setItems}
                            containerStyle={{ width: '50%' }}
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
