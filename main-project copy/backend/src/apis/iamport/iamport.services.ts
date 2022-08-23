import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class IamportService {
  async setNewToken() {
    const newToken = await axios({
      url: 'https://api.iamport.kr/users/getToken',
      method: 'post', // POST method
      headers: { 'Content-Type': 'application/json' }, // "Content-Type": "application/json"
      data: {
        imp_key: '7734764430727650', // REST API 키
        imp_secret:
          '0vmvZV6FQAR0kMcEGu8wxmNo0LcRFFRD3F8z1mC8jbqCPl6uZiOqth9DZSOLpu1D7Ux0LEXboSU3ldtr', // REST API Secret
      },
    });
    console.log('12345', newToken.data.response.access_token);

    return newToken.data.response.access_token;
  }

  async getPaymentData({ impUid, Token }) {
    try {
      const getData = await axios({
        url: `https://api.iamport.kr/payments/${impUid}`,
        method: 'get', // GET method
        headers: { Authorization: Token },
      });

      console.log('54321');

      return getData.data.response;
    } catch {
      throw new UnprocessableEntityException('올바른 imp_uid가 아닙니다.');
    }
  }

  async getCancelData({ imp_uid: impUid, Token, amount }) {
    try {
      const getCData = await axios({
        url: `https://api.iamport.kr/payments/cancel`,
        method: 'post',
        headers: { Authorization: Token },
        data: {
          imp_uid: impUid,
          amount,
        },
      });
      console.log('1234', getCData.data);
      return getCData.data;
    } catch (error) {
      console.log(error);
      return error;
    }

    // console.log('77777', getCData);
  }
}
