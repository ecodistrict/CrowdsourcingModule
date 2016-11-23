module Demando
  module DemandoHelper
    include Demando::Concerns::Helpers::DemandoHelper

    def get_ecodistrict_buildings(case_id, variant_id = nil)
      options = {
          query: {
              caseId: case_id
          }
      }
      options[:query][:variantId] = variant_id if variant_id.present?
      json = HTTParty.get('http://vps17642.public.cloudvps.com/EcoRestApi/EcoRestApi.dll/allbuildings', options).body

      begin
        JSON.parse(json)
        return json
      rescue JSON::ParserError => e
        return nil
      end
    end
  end
end