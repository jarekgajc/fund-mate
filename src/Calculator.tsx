import React, { useState } from 'react';

const CapitalTaxCalculator = () => {
    const [exchangeRates, setExchangeRates] = useState(null);
    const [transactions, setTransactions] = useState(null);
    const [tax, setTax] = useState(null);

    const readCSV = (file, callback) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const text = event.target.result;
            const lines = text.split('\n').map(line => line.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/)); // Obsługa przecinków w cudzysłowach
            const headers = lines[0].map(header => header.trim());
            const results = lines.slice(1).map(line => {
                let obj = {};
                headers.forEach((header, index) => {
                    obj[header] = line[index] ? line[index].trim().replace(/"/g, '') : '';
                });
                return obj;
            }).filter(obj => Object.values(obj).some(value => value !== ''));
            callback(results);
        };
        reader.readAsText(file);
    };

    const parseNumber = (str) => parseFloat(str.replace(',', '.'));

    const getPreviousBusinessDay = (date, exchangeRates) => {
        let prevDate = new Date(date);
        prevDate.setDate(prevDate.getDate());
        let prevDateStr = prevDate.toISOString().split('T')[0].replace(/-/g, '');

        while (!exchangeRates.some(rate => rate.data === prevDateStr)) {
            prevDate.setDate(prevDate.getDate() - 1);
            prevDateStr = prevDate.toISOString().split('T')[0].replace(/-/g, '');
        }
        return prevDateStr;
    };

    const calculateCapitalTax = () => {
        console.log(exchangeRates);
        console.log(transactions);
        if (!exchangeRates || !transactions) return;
        let totalPLNInterest = 0;
        let totalEURInterest = 0;

        transactions.forEach(tx => {
            if (tx.Description.includes('Gross interest')) {
                let interestEUR = parseFloat(tx['Money in'].replace(/[^0-9.-]+/g, ''));
                let date = tx['Completed Date'].trim();

                let prevBusinessDay = getPreviousBusinessDay(new Date(date), exchangeRates);
                let exchangeRateEntry = exchangeRates.find(rate => rate.data === prevBusinessDay);
                console.log(exchangeRateEntry, interestEUR);

                if (exchangeRateEntry) {
                    let exchangeRate = parseNumber(exchangeRateEntry['1EUR']);
                    let interestPLN = interestEUR * exchangeRate;
                    totalEURInterest += interestEUR;
                    totalPLNInterest += interestPLN;
                } else {
                    throw new Error("AAAA");
                }
            }
        });

        console.log(totalPLNInterest, totalEURInterest);
        setTax((totalPLNInterest * 0.19).toFixed(2));
    };

    return (
        <div>
            <h2>Kalkulator podatku kapitałowego</h2>
            <input type="file" onChange={(e) => readCSV(e.target.files[0], setExchangeRates)} />
            <input type="file" onChange={(e) => readCSV(e.target.files[0], setTransactions)} />
            <button onClick={calculateCapitalTax} disabled={!exchangeRates || !transactions}>
                Oblicz podatek
            </button>
            {tax !== null && <p>Podatek do zapłaty: {tax} PLN</p>}
        </div>
    );
};

export default CapitalTaxCalculator;
