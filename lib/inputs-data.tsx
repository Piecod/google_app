import { createContext, useContext, useState, ReactNode } from "react";

interface InputsState {
    initialInvestment: number;
    annualReturnRate: number;
    annualDividendYield: number;
    transactionFees: number;
    chartData: any;
    updateInputs: (newInputs: Partial<InputsState>) => void;
    setChartData: (data: any) => void;
}

const defaultValues: InputsState = {
    initialInvestment: 0,
    annualReturnRate: 10.73,
    annualDividendYield: 3.5,
    transactionFees: 2.7,
    chartData: null,
    updateInputs: () => {},
    setChartData: () => {},
};

const InputsContext = createContext<InputsState>(defaultValues);

export const InputsProvider = ({ children }: { children: ReactNode }) => {
    const [inputs, setInputs] = useState(defaultValues);
    const [chartData, _setChartData] = useState<any>(null);

    const updateInputs = (newInputs: Partial<InputsState>) => {
        setInputs(prev => ({ ...prev, ...newInputs }));
    };

    const setChartData = (data: any) => {
        _setChartData(data);
    };

    return (
        <InputsContext.Provider value={{ ...inputs, chartData, updateInputs, setChartData }}>
            {children}
        </InputsContext.Provider>
    );
};

export const useInputs = () => useContext(InputsContext);