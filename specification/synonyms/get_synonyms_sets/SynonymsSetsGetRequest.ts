/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { RequestBase } from '@_types/Base'
import { Name } from '@_types/common'
import { integer } from '@_types/Numeric'

/**
 * Retrieves a summary of all defined synonym sets
 * @rest_spec_name synonyms.get_synonyms_sets
 * @availability stack since=8.10.0 stability=experimental
 * @availability serverless stability=experimental visibility=public
 */
interface Request extends RequestBase {
  query_parameters: {
    /**
     * Starting offset (default: 0)
     */
    from?: integer
    /**
     * specifies a max number of results to get (default: 10)
     */
    size?: integer
  }
}