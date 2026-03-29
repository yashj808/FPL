import 'package:flutter/material.dart';
import '../models/stock.dart';
import 'individual_stock_page.dart';

class StocksPage extends StatelessWidget {
  StocksPage({super.key});

  final List<Stock> dummyStocks = [
    Stock(symbol: 'AAPL', name: 'Apple Inc.', price: 175.50, percentageChange: 1.2),
    Stock(symbol: 'MSFT', name: 'Microsoft Corp.', price: 340.20, percentageChange: -0.5),
    Stock(symbol: 'GOOGL', name: 'Alphabet Inc.', price: 135.80, percentageChange: 2.1),
    Stock(symbol: 'AMZN', name: 'Amazon.com Inc.', price: 140.00, percentageChange: 0.8),
    Stock(symbol: 'TSLA', name: 'Tesla Inc.', price: 250.30, percentageChange: -1.5),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Stocks'),
      ),
      body: ListView.builder(
        itemCount: dummyStocks.length,
        itemBuilder: (context, index) {
          final stock = dummyStocks[index];
          final isPositive = stock.percentageChange >= 0;
          return ListTile(
            title: Text(stock.symbol, style: const TextStyle(fontWeight: FontWeight.bold)),
            subtitle: Text(stock.name),
            trailing: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                Text('\$${stock.price.toStringAsFixed(2)}', style: const TextStyle(fontWeight: FontWeight.bold)),
                Text(
                  '${isPositive ? '+' : ''}${stock.percentageChange.toStringAsFixed(2)}%',
                  style: TextStyle(color: isPositive ? Colors.green : Colors.red),
                ),
              ],
            ),
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => IndividualStockPage(stock: stock),
                ),
              );
            },
          );
        },
      ),
    );
  }
}
