import SparkLogger from './sparkLogger';

let logger: SparkLogger = new SparkLogger(SparkLogger._buildTypes.DEVELOPMENT);

const obj = {
    'objectData': 'Its Good to be here'
}

/**
   * @param 1 filename
   * @param 2 Message to show in log
   * @param 3 Any Object to print {*Optional*}
   */
logger.info('index.ts', 'Message to show in console with info style', obj);

/**
   * @param 1 filename
   * @param 2 Message to show in log
   * @param 3 Any Object to print {*Optional*}
   */
logger.warning('index.ts', 'Message to show in console with warning style', obj);
/**
   * @param 1 filename
   * @param 2 Message to show in log
   * @param 3 Any Object to print {*Optional*}
   */
logger.error('index.ts', 'Message to show in console with error style', obj);

/**
   * @param 1 filename
   * @param 2 Message to show in log
   * @param 3 Any Object to print {*Optional*}
   */
logger.debug('index.ts', 'Message to show in console with debug style');