require 'openssl'
require 'net/http'

module RongCloudIM

  ACTION_USER_TOKEN = "/user/getToken" 

  class << self
    def sign data
      OpenSSL::Digest::SHA1.new(data).to_s
    end

    def headers
      nonce = Random.new_seed.to_s
      timestamp = Time.now.to_i.to_s
      app_secret = 'RcSM2RQcHP5k'
      signature = sign app_secret + nonce + timestamp
      {
        'RC-App-Key': 'c9kqb3rdklwcj',
        'RC-Nonce': nonce,
        'RC-Timestamp': timestamp,
        'RC-Signature': signature
      }
    end

    def user_get_token options = {}
      api_host = "http://api.cn.ronghub.com"
      response_type = "json"

      uri = URI(api_host + ACTION_USER_TOKEN + "." + response_type)
      data = {
        userId: options[:user_id],
        name: options[:name],
        portraitUri: options[:portrait_uri]
      }

      http = Net::HTTP.new(uri.host, uri.port)

      request = Net::HTTP::Post.new(uri.path)
      
      headers.each do |key, value|
        request.add_field(key, value)
      end
      
      request.set_form_data(data)
      response = http.request(request)

      response.body
    end

  end
  
end