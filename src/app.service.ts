import { Injectable } from '@nestjs/common';

import { Queue, Worker } from 'bullmq';

const myQueue = new Queue('foo');

async function addJobs() {
  await myQueue.add('myJobName', { foo: 'bar' });
  await myQueue.add('myJobName', { qux: 'baz' });
  await myQueue.add('myJobName', { qux: 'xxxx' });
}

const worker = new Worker('foo', async (job) => {
  // Will print { foo: 'bar'} for the first job
  // and { qux: 'baz' } for the second.
  console.log(job.data);
});

@Injectable()
export class AppService {
  async getHello() {
    return addJobs();
  }
}
