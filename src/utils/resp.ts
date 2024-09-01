class Resp {
  public ok(data: any) {
    return { data: data };
  }

  public error(status: number, message: string, data?: any) {
    return { status: status, message: message, data: data };
  }
}

export default new Resp();
