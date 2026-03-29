import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:stock_market_app/main.dart';

void main() {
  testWidgets('App starts on Login page', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(const MyApp());

    // Verify that we are on the login page initially.
    expect(find.text('Login'), findsWidgets);
    expect(find.text('Password'), findsOneWidget);
    expect(find.text('Email'), findsOneWidget);

    // Enter text into the fields
    await tester.enterText(find.byType(TextField).first, 'test@example.com');
    await tester.enterText(find.byType(TextField).last, 'password123');

    // Tap the login button and trigger a frame.
    await tester.tap(find.byType(ElevatedButton));
    await tester.pumpAndSettle();

    // Verify that we navigate to the Stocks page.
    expect(find.text('Stocks'), findsWidgets);
    expect(find.text('Account'), findsOneWidget);
  });
}
