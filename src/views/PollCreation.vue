<template>
  <div>
    <form class="w-full" autocomplete="off" @keypress.enter.prevent>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 select-none flex items-center"
            for="question">
            <i class="material-icons">help</i>
            {{ $t("poll.fields.question") }} *</label
          >
          <input
            id="question"
            v-model="question"
            data-testid="form-question"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="text"
          />

          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 select-none flex items-center"
            for="description">
            <i class="material-icons">create</i>
            {{ $t("poll.fields.description") }}
          </label
          >
          <textarea
            id="description"
            v-model="description"
            data-testid="form-description"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          ></textarea>
        </div>
        <div class="w-full md:w-1/2 px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 select-none flex items-center"
            for="answer"
          >
            <i class="material-icons">question_answer</i>
            {{ $t("poll.fields.answer") }} *
          </label>
          <div class="flex">
            <input
              id="answer"
              ref="answerInput"
              v-model="answer"
              data-testid="form-answer"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              @keypress.enter="addAnswer"
            />
            <button
              data-testid="form-addAnswer"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 flex"
              @click.prevent="addAnswer"
            >
              <i class="material-icons mr-1">add</i>
              {{ $t("global.add") }}
            </button>
          </div>

          <ul class="list-disc mt-6 ml-10">
            <li
              v-for="answerProposal in answers"
              :key="answerProposal.slug"
              class="mt-2"
            >
              {{ answerProposal.value }}
              <button
                :data-testid="`form-answerProposal-${answerProposal.slug}`"
                class="bg-red-500 hover:bg-red-700 text-white font-bold w-6 h-6 rounded-full float-right"
                @click.prevent="removeAnswer(answerProposal.slug)"
              >
                -
              </button>
            </li>
          </ul>
        </div>
        <div class="w-full mt-4 px-3 flex flex-col justify-center items-center">
          <div class="md:flex md:items-center mb-1">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold whitespace-no-wrap flex items-center mr-1 select-none"
              for="isPublic"
            >
              <i v-if="isPublic" class="material-icons">public</i>
              <i v-else class="material-icons">lock</i>
              {{ $t("poll.fields.isPublic") }}
            </label>
            <input
              id="isPublic"
              v-model="isPublic"
              data-testid="form-isPublic"
              class="mr-2 leading-tight"
              type="checkbox"
              name="isPublic"
            />
            <label
              for="isPublic"
              class="md:w-2/3 block text-gray-500 font-bold inline-block"
            >
              <span class="text-sm">{{ isPublicText }}</span>
            </label>
          </div>
          <button
            data-testid="form-submit"
            :disabled="disabledSubmit"
            class="w-1/3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex flex-wrap justify-between"
            :class="disabledSubmit && 'opacity-50 cursor-not-allowed'"
            @click.prevent="submitPoll"
          >
            <span class="w-1/3"></span>
            <span class="w-1/3">{{ $t("global.create") }}</span>
            <span class="w-1/3 flex justify-end">
              <i class="material-icons">add</i>
            </span>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import slugify from "slugify";
import randomString from "random-string";
import { createPoll } from "../utils/request";

export default {
  name: "PollCreation",
  data() {
    return {
      question: "",
      description: "",
      answer: "",
      answers: [],
      isPublic: false
    };
  },
  computed: {
    ...mapState({
      userId: state => state.user.id
    }),
    isPublicText() {
      return this.isPublic ? "Oui" : "Non";
    },
    disabledSubmit() {
      return this.answers.length < 2 || this.question === "";
    }
  },
  methods: {
    ...mapActions("app", ["addNotification"]),
    async submitPoll() {
      try {
        await createPoll({
          question: this.question,
          description: this.description,
          answers: this.answers,
          owner: this.userId,
          users: [this.userId],
          isPublic: this.isPublic,
          isActive: true,
          token: randomString({ length: 20 })
        });

        this.addNotification({
          text: "Scrutin créé mon pote",
          status: "success"
        });

        this.question = "";
        this.description = "";
        this.answer = "";
        this.answers = [];
      } catch (error) {
        this.addNotification({
          text: `Il y a eu un problème lors de la création du scrutin`,
          status: "error"
        });
      }
    },
    addAnswer() {
      const cleanAnswer = this.answer.trim();
      if (cleanAnswer.length === 0) {
        this.addNotification({
          text: "Une réponse ne peut pas être vide",
          status: "warning"
        });
        return;
      }

      if (this.answers.find(answer => answer.value === cleanAnswer)) {
        this.addNotification({
          text: "Cette réponse existe déjà",
          status: "warning"
        });

        return;
      }

      this.answers = [
        ...this.answers,
        {
          value: cleanAnswer,
          slug: slugify(cleanAnswer, { lower: true, replacement: "-" })
        }
      ];
      this.answer = "";
      this.$refs.answerInput.focus();
    },
    removeAnswer(slug) {
      this.answers = this.answers.filter(answer => answer.slug !== slug);
    }
  }
};
</script>

<style></style>
