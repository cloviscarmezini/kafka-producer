import { Kafka } from "kafkajs";
import { randomUUID } from 'node:crypto';

async function bootstrap() {
    const kafka = new Kafka({
        brokers: ['dear-ox-6437-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username: 'ZGVhci1veC02NDM3JIQtk8Sx7j-tg4-Co3m8ojlrMOLXDPchsZzsAdwG0NzsegI',
          password: 'le-oS51jktfhsuyh4EwR0rNHvu0WcW4k86WMVdxQ-S1MRF-c4Gi5WV5FIRUz72BZPyhJuw==',
        },
        ssl: true,
    });
       
    const producer = kafka.producer();
    await producer.connect();

    await producer.send({
        topic: 'notifications.send-notification',
        messages: [
            {
                value: JSON.stringify({
                    content: 'Clovis enviou uma mensagem 3!',
                    category: 'social',
                    recipientId: randomUUID()
                })
            }
        ]
    });
    
    await producer.disconnect();
}

bootstrap();
