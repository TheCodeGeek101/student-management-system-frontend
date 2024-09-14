import { NextResponse } from 'next/server';

interface PaymentNotification {
  tx_ref: string;
  status: string;
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { tx_ref, status }: PaymentNotification = await request.json();

    if (status === 'successful') {
      console.log(`Transaction successful: ${tx_ref}`);
      // Respond with a message and potential redirection URL
      return NextResponse.json({
        message: 'Payment received successfully!',
        redirectTo: '/Student/Payments/Fees', // Redirect URL on successful payment
      });
    } else {
      console.log(`Transaction status: ${status} for tx_ref: ${tx_ref}`);
      return NextResponse.json({
        message: 'Payment status is not successful.',
      });
    }
  } catch (error) {
    console.error('Error handling payment callback:', error);
    return NextResponse.json({ message: 'An error occurred.' }, { status: 500 });
  }
}
