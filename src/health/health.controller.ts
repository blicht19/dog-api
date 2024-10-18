import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor() {}

  @ApiOperation({ summary: 'Get the health of the service' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Service is healthy',
  })
  @Get()
  health() {
    return { status: 'ok' };
  }
}
