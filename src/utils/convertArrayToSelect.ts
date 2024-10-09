type InputArray = { id: string; name: string }[];
type SelectOption = { value: string; label: string; };

export const convertArrayToSelect = (array: InputArray): SelectOption[] => {
    return array.map(item => ({
        value: item.id,
        label: item.name,
    }));
};

export const convertArrayToSelectStatus = (array: InputArray): SelectOption[] => {
    return array.map(item => ({
        value: item.name,
        label: item.name,
    }));
};

