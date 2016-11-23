module Demando
  module Admin
    class QuestionnairesController < AdminController
      include Demando::Concerns::Controllers::Admin::QuestionnairesController

      private
      def questionnaire_params
        params.require(:questionnaire).permit(:id, :ecodistrict_case_id, :ecodistrict_variant_id, questionnaire_translations_attributes: [:id, :demando_locale_id, :is_default, :title, :finished_title, :finished_description, :_destroy])
      end
    end
  end
end