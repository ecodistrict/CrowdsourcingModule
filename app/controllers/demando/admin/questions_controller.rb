module Demando
  module Admin
    class QuestionsController < AdminController
      include Demando::Concerns::Controllers::Admin::QuestionsController

      private
      def question_params
        params.require(:question).permit(:id, :demando_question_type_id, :ecodistrict_property_name,
                                         question_translations_attributes: [:id, :demando_locale_id, :title, :help_text],
                                         question_validators_attributes: [:id, :weight, :demando_validator_id, :param0, :param1, :_destroy],
                                         options_attributes: [:id, :weight, :is_other, :is_not_applicable, :hide_label, :_destroy,
                                                              option_translations_attributes: [:id, :demando_locale_id, :title, :help_text, :prefix, :suffix]
                                         ])
      end
    end
  end
end