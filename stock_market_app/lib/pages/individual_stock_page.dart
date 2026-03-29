import 'package:flutter/material.dart';
import '../models/stock.dart';

class IndividualStockPage extends StatelessWidget {
  final Stock stock;

  const IndividualStockPage({super.key, required this.stock});

  @override
  Widget build(BuildContext context) {
    final isPositive = stock.percentageChange >= 0;

    return Scaffold(
      appBar: AppBar(
        title: Text(stock.symbol),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              stock.name,
              style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            Row(
              children: [
                Text(
                  '\$${stock.price.toStringAsFixed(2)}',
                  style: const TextStyle(fontSize: 32, fontWeight: FontWeight.w500),
                ),
                const SizedBox(width: 16),
                Text(
                  '${isPositive ? '+' : ''}${stock.percentageChange.toStringAsFixed(2)}%',
                  style: TextStyle(
                    fontSize: 20,
                    color: isPositive ? Colors.green : Colors.red,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 32),
            // Placeholder for a chart
            Container(
              height: 250,
              width: double.infinity,
              decoration: BoxDecoration(
                color: Colors.grey[200],
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: Colors.grey[400]!),
              ),
              child: const Center(
                child: Text(
                  'Chart Placeholder',
                  style: TextStyle(color: Colors.grey, fontSize: 18),
                ),
              ),
            ),
            const SizedBox(height: 32),
            const Text(
              'About',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            Text(
              '${stock.name} is a leading company in its sector. This is a placeholder description for the stock detailing its business operations and recent news.',
              style: const TextStyle(fontSize: 16),
            ),
          ],
        ),
      ),
    );
  }
}
