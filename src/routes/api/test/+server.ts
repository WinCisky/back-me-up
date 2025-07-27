// src/routes/api/test/+server.ts
import { createDB, users, UserService } from '$lib/db';
import { eq } from 'drizzle-orm';

export const GET = async ({ platform }: any) => {
	// This will log to the Cloudflare Workers console
	console.log('🚀 Hello from Cloudflare Pages server function!');
	console.log('📅 Current time:', new Date().toISOString());
	console.log('🌍 Running on Cloudflare Workers');
	
	// You can also access environment variables
	if (platform?.env) {
		console.log('💾 Database binding available:', !!platform.env.DB);
		console.log('🔑 Google Client ID available:', !!platform.env.GOOGLE_CLIENT_ID);
		
		// Example of using the database
		if (platform.env.DB) {
			const db = createDB(platform.env.DB);
			try {
				// Get user count
				const userCount = await db.select().from(users);
				console.log('👥 Total users in database:', userCount.length);
			} catch (error) {
				console.log('❌ Database error:', error);
			}
		}
	}

	return new Response(JSON.stringify({
		message: 'Server function executed successfully! Check the Cloudflare Pages logs.',
		timestamp: new Date().toISOString(),
		location: 'Cloudflare Workers'
	}), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
};

export const POST = async ({ request, platform }: any) => {
	const body = await request.json();
	
	console.log('📝 POST request received with body:', body);
	console.log('🎯 Processing data on server...');
	
	// Example of creating a user
	const db = createDB(platform.env.DB);
	const userService = new UserService(db);
	
	// Create a new user
	const newUser = await userService.createUser({
		email: 'user@example.com',
		name: 'John Doe',
		googleId: 'google-id-123',
	});
	
	console.log(JSON.stringify(newUser));
	
	// Simulate some server processing
	const processedData = {
		...body,
		processed: true,
		serverTimestamp: new Date().toISOString()
	};
	
	console.log('✅ Data processed successfully:', processedData);
	
	return new Response(JSON.stringify({
		message: 'Data processed on server',
		data: processedData
	}), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
